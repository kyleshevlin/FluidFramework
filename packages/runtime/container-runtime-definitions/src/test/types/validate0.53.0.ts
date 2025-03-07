/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-validator in @fluidframework/build-tools.
 */
import * as old from "@fluidframework/container-runtime-definitions-0.53.0";
import * as current from "../../index";

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "VariableDeclaration_IContainerRuntime": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_IContainerRuntime():
    typeof old.IContainerRuntime;
declare function use_current_VariableDeclaration_IContainerRuntime(
    use: typeof current.IContainerRuntime);
use_current_VariableDeclaration_IContainerRuntime(
    get_old_VariableDeclaration_IContainerRuntime());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "VariableDeclaration_IContainerRuntime": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_IContainerRuntime():
    typeof current.IContainerRuntime;
declare function use_old_VariableDeclaration_IContainerRuntime(
    use: typeof old.IContainerRuntime);
use_old_VariableDeclaration_IContainerRuntime(
    get_current_VariableDeclaration_IContainerRuntime());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "InterfaceDeclaration_IContainerRuntime": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IContainerRuntime():
    old.IContainerRuntime;
declare function use_current_InterfaceDeclaration_IContainerRuntime(
    use: current.IContainerRuntime);
use_current_InterfaceDeclaration_IContainerRuntime(
    get_old_InterfaceDeclaration_IContainerRuntime());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "InterfaceDeclaration_IContainerRuntime": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IContainerRuntime():
    current.IContainerRuntime;
declare function use_old_InterfaceDeclaration_IContainerRuntime(
    use: old.IContainerRuntime);
use_old_InterfaceDeclaration_IContainerRuntime(
    // @ts-expect-error compatibility expected to be broken
    get_current_InterfaceDeclaration_IContainerRuntime());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents():
    old.IContainerRuntimeBaseWithCombinedEvents;
declare function use_current_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents(
    use: current.IContainerRuntimeBaseWithCombinedEvents);
use_current_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents(
    get_old_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents():
    current.IContainerRuntimeBaseWithCombinedEvents;
declare function use_old_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents(
    use: old.IContainerRuntimeBaseWithCombinedEvents);
use_old_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents(
    // @ts-expect-error compatibility expected to be broken
    get_current_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "InterfaceDeclaration_IContainerRuntimeEvents": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IContainerRuntimeEvents():
    old.IContainerRuntimeEvents;
declare function use_current_InterfaceDeclaration_IContainerRuntimeEvents(
    use: current.IContainerRuntimeEvents);
use_current_InterfaceDeclaration_IContainerRuntimeEvents(
    get_old_InterfaceDeclaration_IContainerRuntimeEvents());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "InterfaceDeclaration_IContainerRuntimeEvents": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IContainerRuntimeEvents():
    current.IContainerRuntimeEvents;
declare function use_old_InterfaceDeclaration_IContainerRuntimeEvents(
    use: old.IContainerRuntimeEvents);
use_old_InterfaceDeclaration_IContainerRuntimeEvents(
    get_current_InterfaceDeclaration_IContainerRuntimeEvents());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "InterfaceDeclaration_IProvideContainerRuntime": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IProvideContainerRuntime():
    old.IProvideContainerRuntime;
declare function use_current_InterfaceDeclaration_IProvideContainerRuntime(
    use: current.IProvideContainerRuntime);
use_current_InterfaceDeclaration_IProvideContainerRuntime(
    get_old_InterfaceDeclaration_IProvideContainerRuntime());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.53.0:
* "InterfaceDeclaration_IProvideContainerRuntime": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IProvideContainerRuntime():
    current.IProvideContainerRuntime;
declare function use_old_InterfaceDeclaration_IProvideContainerRuntime(
    use: old.IProvideContainerRuntime);
use_old_InterfaceDeclaration_IProvideContainerRuntime(
    // @ts-expect-error compatibility expected to be broken
    get_current_InterfaceDeclaration_IProvideContainerRuntime());
