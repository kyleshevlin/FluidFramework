/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISequencedDocumentMessage,  MessageType } from "@fluidframework/protocol-definitions";
import {
    IFluidDataStoreRuntime,
    IChannelStorageService,
    IChannelFactory,
} from "@fluidframework/datastore-definitions";
import { readAndParse } from "@fluidframework/driver-utils";
import { ISummaryTreeWithStats } from "@fluidframework/runtime-definitions";
import { createSingleBlobSummary, IFluidSerializer, SharedObject } from "@fluidframework/shared-object-base";
import { CounterFactory } from "./counterFactory";
import { ISharedCounter, ISharedCounterEvents } from "./interfaces";

/**
 * Describes the op format for incrementing the counter
 */
interface IIncrementOperation {
    type: "increment";
    incrementAmount: number;
}

/**
 * Used in snapshotting.
 */
interface ICounterSnapshotFormat {
    // The value of the counter
    value: number;
}

const snapshotFileName = "header";

/**
 * A `SharedCounter` is a shared object which holds a number that can be incremented or decremented.
 * @public
 *
 * @remarks
 * ### Creation
 *
 * To create a `SharedCounter`, get the factory and call create with a runtime and string ID:
 *
 * ```typescript
 * const factory = SharedCounter.getFactory();
 * const counter = factory.create(this.runtime, id) as SharedCounter;
 * ```
 *
 * ### Usage
 *
 * Once created, you can call `increment` to modify the value with either a positive or negative number:
 *
 * ```typescript
 * counter.increment(10); // add 10 to the counter value
 * counter.increment(-5); // subtract 5 from the counter value
 * ```
 *
 * To observe changes to the value (including those from remote clients), register for the `"incremented"` event:
 *
 * ```typescript
 * counter.on("incremented", (incrementAmount, newValue) => {
 *     console.log(`The counter incremented by ${incrementAmount} and now has a value of ${newValue}`);
 * });
 * ```
 */
export class SharedCounter extends SharedObject<ISharedCounterEvents> implements ISharedCounter {
    /**
     * Create a new shared counter
     *
     * @param runtime - data store runtime the new shared counter belongs to
     * @param id - optional name of the shared counter
     * @returns newly create shared counter (but not attached yet)
     */
    public static create(runtime: IFluidDataStoreRuntime, id?: string) {
        return runtime.createChannel(id, CounterFactory.Type) as SharedCounter;
    }

    /**
     * Get a factory for SharedCounter to register with the data store.
     *
     * @returns a factory that creates and load SharedCounter
     */
    public static getFactory(): IChannelFactory {
        return new CounterFactory();
    }

    private _value: number = 0;

    /**
     * {@inheritDoc ISharedCounter.value}
     */
    public get value() {
        return this._value;
    }

    /**
     * {@inheritDoc ISharedCounter.increment}
     */
    public increment(incrementAmount: number) {
        // Incrementing by floating point numbers will be eventually inconsistent, since the order in which the
        // increments are applied affects the result.  A more-robust solution would be required to support this.
        if (incrementAmount % 1 !== 0) {
            throw new Error("Must increment by a whole number");
        }

        const op: IIncrementOperation = {
            type: "increment",
            incrementAmount,
        };

        this.incrementCore(incrementAmount);
        this.submitLocalMessage(op);
    }

    private incrementCore(incrementAmount: number) {
        this._value += incrementAmount;
        this.emit("incremented", incrementAmount, this._value);
    }

    /**
     * Create a summary for the counter
     *
     * @returns the summary of the current state of the counter
     * @internal
     */
    protected summarizeCore(serializer: IFluidSerializer): ISummaryTreeWithStats {
        // Get a serializable form of data
        const content: ICounterSnapshotFormat = {
            value: this.value,
        };

        // And then construct the summary for it
        return createSingleBlobSummary(snapshotFileName, JSON.stringify(content));
    }

    /**
     * {@inheritDoc @fluidframework/shared-object-base#SharedObject.loadCore}
     * @internal
     */
    protected async loadCore(storage: IChannelStorageService): Promise<void> {
        const content = await readAndParse<ICounterSnapshotFormat>(storage, snapshotFileName);

        this._value = content.value;
    }

    /**
     * {@inheritDoc @fluidframework/shared-object-base#SharedObject.registerCore}
     * @internal
     */
    protected registerCore() {
    }

    /**
     * Called when the object has disconnected from the delta stream.
     * @internal
     */
    protected onDisconnect() { }

    /**
     * Process a counter operation
     *
     * @param message - the message to prepare
     * @param local - whether the message was sent by the local client
     * @param localOpMetadata - For local client messages, this is the metadata that was submitted with the message.
     * For messages from a remote client, this will be undefined.
     * @internal
     */
    protected processCore(message: ISequencedDocumentMessage, local: boolean, localOpMetadata: unknown) {
        if (message.type === MessageType.Operation && !local) {
            const op = message.contents as IIncrementOperation;

            switch (op.type) {
                case "increment":
                    this.incrementCore(op.incrementAmount);
                    break;

                default:
                    throw new Error("Unknown operation");
            }
        }
    }

    /**
     * Not implemented.
     * @internal
     */
    protected applyStashedOp() {
        throw new Error("not implemented");
    }
}
