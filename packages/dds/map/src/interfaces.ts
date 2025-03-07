/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISharedObject, ISharedObjectEvents } from "@fluidframework/shared-object-base";
import { IEvent, IEventProvider, IEventThisPlaceHolder } from "@fluidframework/common-definitions";

/**
 * Type of "valueChanged" event parameter.
 */
export interface IValueChanged {
    /**
     * The key storing the value that changed.
     */
    key: string;

    /**
     * The value that was stored at the key prior to the change.
     */
    previousValue: any;
}

/**
 * Interface describing actions on a directory.
 *
 * @remarks
 * When used as a Map, operates on its keys.
 */
export interface IDirectory extends Map<string, any>, IEventProvider<IDirectoryEvents> {
    /**
     * The absolute path of the directory.
     */
    readonly absolutePath: string;

    /**
     * Retrieves the value stored at the given key from the directory.
     * @param key - Key to retrieve from
     * @returns The stored value, or undefined if the key is not set
     */
    get<T = any>(key: string): T | undefined;

    /**
     * A form of get except it will only resolve the promise once the key exists in the directory.
     * @param key - Key to retrieve from
     * @returns The stored value once available
     * @deprecated 0.55 - This method will be removed in an upcoming release.  See BREAKING.md for migration options.
     */
    wait<T = any>(key: string): Promise<T>;

    /**
     * Sets the value stored at key to the provided value.
     * @param key - Key to set at
     * @param value - Value to set
     * @returns The IDirectory itself
     */
    set<T = any>(key: string, value: T): this;

    /**
     * Creates an IDirectory child of this IDirectory, or retrieves the existing IDirectory child if one with the
     * same name already exists.
     * @param subdirName - Name of the new child directory to create
     * @returns The IDirectory child that was created or retrieved
     */
    createSubDirectory(subdirName: string): IDirectory;

    /**
     * Gets an IDirectory child of this IDirectory, if it exists.
     * @param subdirName - Name of the child directory to get
     * @returns The requested IDirectory
     */
    getSubDirectory(subdirName: string): IDirectory | undefined;

    /**
     * Checks whether this directory has a child directory with the given name.
     * @param subdirName - Name of the child directory to check
     * @returns True if it exists, false otherwise
     */
    hasSubDirectory(subdirName: string): boolean;

    /**
     * Deletes an IDirectory child of this IDirectory, if it exists, along with all descendent keys and directories.
     * @param subdirName - Name of the child directory to delete
     * @returns True if the IDirectory existed and was deleted, false if it did not exist
     */
    deleteSubDirectory(subdirName: string): boolean;

    /**
     * Gets an iterator over the IDirectory children of this IDirectory.
     * @returns The IDirectory iterator
     */
    subdirectories(): IterableIterator<[string, IDirectory]>;

    /**
     * Get an IDirectory within the directory, in order to use relative paths from that location.
     * @param relativePath - Path of the IDirectory to get, relative to this IDirectory
     * @returns The requested IDirectory
     */
    getWorkingDirectory(relativePath: string): IDirectory | undefined;
}

/**
 * Events emitted in response to changes to the directory data.  These events only emit on the ISharedDirectory itself,
 * and not on subdirectories.
 *
 * ### "valueChanged"
 *
 * The valueChanged event is emitted when a key is set or deleted.  This is emitted for any key in the ISharedDirectory
 * or any subdirectory.
 *
 * #### Listener signature
 *
 * ```typescript
 * (
 *     changed: IDirectoryValueChanged,
 *     local: boolean,
 *     op: ISequencedDocumentMessage | null,
 *     target: IEventThisPlaceHolder,
 * ) => void
 * ```
 * - `changed` - Information on the key that changed, its value prior to the change, and the path to the key that
 *   changed.
 *
 * - `local` - Whether the change originated from the this client.
 *
 * - `op` - The op that caused the change in value.
 *
 * - `target` - The ISharedDirectory itself.
 *
 * ### "clear"
 *
 * The clear event is emitted when the ISharedDirectory is cleared.
 *
 * #### Listener signature
 *
 * ```typescript
 * (local: boolean, op: ISequencedDocumentMessage | null, target: IEventThisPlaceHolder) => void
 * ```
 * - `local` - Whether the clear originated from the this client.
 *
 * - `op` - The op that caused the clear.
 *
 * - `target` - The ISharedDirectory itself.
 */
export interface ISharedDirectoryEvents extends ISharedObjectEvents {
    (event: "valueChanged", listener: (
        changed: IDirectoryValueChanged,
        local: boolean,
        target: IEventThisPlaceHolder,
    ) => void);
    (event: "clear", listener: (
        local: boolean,
        target: IEventThisPlaceHolder,
    ) => void);
}

/**
 * Events emitted in response to changes to the directory data.
 *
 * ### "containedValueChanged"
 *
 * The containedValueChanged event is emitted when a key is set or deleted.  As opposed to the SharedDirectory's
 * valueChanged event, this is emitted only on the IDirectory that directly contains the key.
 *
 * #### Listener signature
 *
 * ```typescript
 * (changed: IValueChanged, local: boolean, target: IEventThisPlaceHolder) => void
 * ```
 * - `changed` - Information on the key that changed and its value prior to the change.
 *
 * - `local` - Whether the change originated from the this client.
 *
 * - `target` - The IDirectory itself.
 */
export interface IDirectoryEvents extends IEvent {
    (event: "containedValueChanged", listener: (
        changed: IValueChanged,
        local: boolean,
        target: IEventThisPlaceHolder,
    ) => void);
}

/**
 * Interface describing a shared directory.
 */
export interface ISharedDirectory extends
    ISharedObject<ISharedDirectoryEvents & IDirectoryEvents>,
    Omit<IDirectory, "on" | "once" | "off"> {
    // The Omit type excludes symbols, which we don't want to exclude.  Adding them back here manually.
    // https://github.com/microsoft/TypeScript/issues/31671
    [Symbol.iterator](): IterableIterator<[string, any]>;
    readonly [Symbol.toStringTag]: string;
}

/**
 * Type of "valueChanged" event parameter for SharedDirectory
 */
export interface IDirectoryValueChanged extends IValueChanged {
    /**
     * The absolute path to the IDirectory storing the key which changed.
     */
    path: string;
}

/**
 * Events emitted in response to changes to the map data.
 *
 * ### "valueChanged"
 *
 * The valueChanged event is emitted when a key is set or deleted.
 *
 * #### Listener signature
 *
 * ```typescript
 * (
 *     changed: IValueChanged,
 *     local: boolean,
 *     op: ISequencedDocumentMessage | null,
 *     target: IEventThisPlaceHolder,
 * ) => void
 * ```
 * - `changed` - Information on the key that changed and its value prior to the change.
 *
 * - `local` - Whether the change originated from the this client.
 *
 * - `op` - The op that caused the change in value.
 *
 * - `target` - The map itself.
 *
 * ### "clear"
 *
 * The clear event is emitted when the map is cleared.
 *
 * #### Listener signature
 *
 * ```typescript
 * (local: boolean, op: ISequencedDocumentMessage | null, target: IEventThisPlaceHolder) => void
 * ```
 * - `local` - Whether the clear originated from the this client.
 *
 * - `op` - The op that caused the clear.
 *
 * - `target` - The map itself.
 */
export interface ISharedMapEvents extends ISharedObjectEvents {
    (event: "valueChanged", listener: (
        changed: IValueChanged,
        local: boolean,
        target: IEventThisPlaceHolder) => void);
    (event: "clear", listener: (
        local: boolean,
        target: IEventThisPlaceHolder
    ) => void);
}

/**
 * Shared map interface
 */
export interface ISharedMap extends ISharedObject<ISharedMapEvents>, Map<string, any> {
    /**
     * Retrieves the given key from the map.
     * @param key - Key to retrieve from
     * @returns The stored value, or undefined if the key is not set
     */
    get<T = any>(key: string): T | undefined;

    /**
     * A form of get except it will only resolve the promise once the key exists in the map.
     * @param key - Key to retrieve from
     * @returns The stored value once available
     * @deprecated 0.55 - This method will be removed in an upcoming release.  See BREAKING.md for migration options.
     */
    wait<T = any>(key: string): Promise<T>;

    /**
     * Sets the value stored at key to the provided value.
     * @param key - Key to set at
     * @param value - Value to set
     * @returns The ISharedMap itself
     */
    set<T = any>(key: string, value: T): this;
}

/**
 * The _ready-for-serialization_ format of values contained in DDS contents.  This allows us to use
 * ISerializableValue.type to understand whether they're storing a Plain JS object, a SharedObject, or a value type.
 * Note that the in-memory equivalent of ISerializableValue is ILocalValue (similarly holding a type, but with
 * the _in-memory representation_ of the value instead).  An ISerializableValue is what gets passed to
 * JSON.stringify and comes out of JSON.parse.  This format is used both for snapshots (loadCore/populate)
 * and ops (set).
 * If type is Plain, it must be a plain JS object that can survive a JSON.stringify/parse.  E.g. a URL object will
 * just get stringified to a URL string and not rehydrate as a URL object on the other side.  It may contain members
 * that are ISerializedHandle (the serialized form of a handle).
 * If type is a value type then it must be amongst the types registered via registerValueType or we won't know how
 * to serialize/deserialize it (we rely on its factory via .load() and .store()).  Its value will be type-dependent.
 * If type is Shared, then the in-memory value will just be a reference to the SharedObject.  Its value will be a
 * channel ID.  This type is legacy and deprecated.
 */
export interface ISerializableValue {
    /**
     * A type annotation to help indicate how the value serializes.
     */
    type: string;

    /**
     * The JSONable representation of the value.
     */
    value: any;
}

export interface ISerializedValue {
    /**
     * A type annotation to help indicate how the value serializes.
     */
    type: string;

    /**
     * String representation of the value.
     */
    value: string | undefined;
}
