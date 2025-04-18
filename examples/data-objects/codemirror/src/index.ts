/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { IContainerContext } from "@fluidframework/container-definitions";
import { ContainerRuntime } from "@fluidframework/container-runtime";
import { IFluidDataStoreFactory } from "@fluidframework/runtime-definitions";
import { buildRuntimeRequestHandler } from "@fluidframework/request-handler";
import { defaultRouteRequestHandler } from "@fluidframework/aqueduct";
import { RuntimeFactoryHelper } from "@fluidframework/runtime-utils";
import { fluidExport as smde } from "./codemirror";

const defaultComponentId = "default";

class CodeMirrorFactory extends RuntimeFactoryHelper {
    public async instantiateFirstTime(runtime: ContainerRuntime): Promise<void> {
        await runtime.createRootDataStore(smde.type, defaultComponentId);
    }

    public async preInitialize(
        context: IContainerContext,
        existing: boolean,
    ): Promise<ContainerRuntime> {
        const registry = new Map<string, Promise<IFluidDataStoreFactory>>([
            [smde.type, Promise.resolve(smde)],
        ]);

        const runtime: ContainerRuntime = await ContainerRuntime.load(
            context,
            registry,
            buildRuntimeRequestHandler(
                defaultRouteRequestHandler(defaultComponentId),
            ),
            undefined, // runtimeOptions
            undefined, // containerScope
            existing,
        );

        return runtime;
    }
}

export const fluidExport = new CodeMirrorFactory();
