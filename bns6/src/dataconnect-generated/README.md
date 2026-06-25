# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListJobPostings*](#listjobpostings)
  - [*MyShifts*](#myshifts)
- [**Mutations**](#mutations)
  - [*CreateJobPosting*](#createjobposting)
  - [*CreateApplication*](#createapplication)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListJobPostings
You can execute the `ListJobPostings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listJobPostings(options?: ExecuteQueryOptions): QueryPromise<ListJobPostingsData, undefined>;

interface ListJobPostingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListJobPostingsData, undefined>;
}
export const listJobPostingsRef: ListJobPostingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listJobPostings(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListJobPostingsData, undefined>;

interface ListJobPostingsRef {
  ...
  (dc: DataConnect): QueryRef<ListJobPostingsData, undefined>;
}
export const listJobPostingsRef: ListJobPostingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listJobPostingsRef:
```typescript
const name = listJobPostingsRef.operationName;
console.log(name);
```

### Variables
The `ListJobPostings` query has no variables.
### Return Type
Recall that executing the `ListJobPostings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListJobPostingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListJobPostingsData {
  jobPostings: ({
    id: UUIDString;
    title: string;
    hourlyRate: number;
    manager: {
      name: string;
      rating?: number | null;
    };
  } & JobPosting_Key)[];
}
```
### Using `ListJobPostings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listJobPostings } from '@dataconnect/generated';


// Call the `listJobPostings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listJobPostings();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listJobPostings(dataConnect);

console.log(data.jobPostings);

// Or, you can use the `Promise` API.
listJobPostings().then((response) => {
  const data = response.data;
  console.log(data.jobPostings);
});
```

### Using `ListJobPostings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listJobPostingsRef } from '@dataconnect/generated';


// Call the `listJobPostingsRef()` function to get a reference to the query.
const ref = listJobPostingsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listJobPostingsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jobPostings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jobPostings);
});
```

## MyShifts
You can execute the `MyShifts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
myShifts(options?: ExecuteQueryOptions): QueryPromise<MyShiftsData, undefined>;

interface MyShiftsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyShiftsData, undefined>;
}
export const myShiftsRef: MyShiftsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
myShifts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MyShiftsData, undefined>;

interface MyShiftsRef {
  ...
  (dc: DataConnect): QueryRef<MyShiftsData, undefined>;
}
export const myShiftsRef: MyShiftsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the myShiftsRef:
```typescript
const name = myShiftsRef.operationName;
console.log(name);
```

### Variables
The `MyShifts` query has no variables.
### Return Type
Recall that executing the `MyShifts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MyShiftsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MyShiftsData {
  shifts: ({
    id: UUIDString;
    actualStartTime: TimestampString;
    actualEndTime: TimestampString;
    totalPay: number;
    jobPosting: {
      title: string;
    };
  } & Shift_Key)[];
}
```
### Using `MyShifts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, myShifts } from '@dataconnect/generated';


// Call the `myShifts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await myShifts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await myShifts(dataConnect);

console.log(data.shifts);

// Or, you can use the `Promise` API.
myShifts().then((response) => {
  const data = response.data;
  console.log(data.shifts);
});
```

### Using `MyShifts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, myShiftsRef } from '@dataconnect/generated';


// Call the `myShiftsRef()` function to get a reference to the query.
const ref = myShiftsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = myShiftsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.shifts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.shifts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateJobPosting
You can execute the `CreateJobPosting` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createJobPosting(vars: CreateJobPostingVariables): MutationPromise<CreateJobPostingData, CreateJobPostingVariables>;

interface CreateJobPostingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJobPostingVariables): MutationRef<CreateJobPostingData, CreateJobPostingVariables>;
}
export const createJobPostingRef: CreateJobPostingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createJobPosting(dc: DataConnect, vars: CreateJobPostingVariables): MutationPromise<CreateJobPostingData, CreateJobPostingVariables>;

interface CreateJobPostingRef {
  ...
  (dc: DataConnect, vars: CreateJobPostingVariables): MutationRef<CreateJobPostingData, CreateJobPostingVariables>;
}
export const createJobPostingRef: CreateJobPostingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createJobPostingRef:
```typescript
const name = createJobPostingRef.operationName;
console.log(name);
```

### Variables
The `CreateJobPosting` mutation requires an argument of type `CreateJobPostingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateJobPostingVariables {
  title: string;
  description: string;
  hourlyRate: number;
  startTime: TimestampString;
  endTime: TimestampString;
  status: string;
}
```
### Return Type
Recall that executing the `CreateJobPosting` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateJobPostingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateJobPostingData {
  jobPosting_insert: JobPosting_Key;
}
```
### Using `CreateJobPosting`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createJobPosting, CreateJobPostingVariables } from '@dataconnect/generated';

// The `CreateJobPosting` mutation requires an argument of type `CreateJobPostingVariables`:
const createJobPostingVars: CreateJobPostingVariables = {
  title: ..., 
  description: ..., 
  hourlyRate: ..., 
  startTime: ..., 
  endTime: ..., 
  status: ..., 
};

// Call the `createJobPosting()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createJobPosting(createJobPostingVars);
// Variables can be defined inline as well.
const { data } = await createJobPosting({ title: ..., description: ..., hourlyRate: ..., startTime: ..., endTime: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createJobPosting(dataConnect, createJobPostingVars);

console.log(data.jobPosting_insert);

// Or, you can use the `Promise` API.
createJobPosting(createJobPostingVars).then((response) => {
  const data = response.data;
  console.log(data.jobPosting_insert);
});
```

### Using `CreateJobPosting`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createJobPostingRef, CreateJobPostingVariables } from '@dataconnect/generated';

// The `CreateJobPosting` mutation requires an argument of type `CreateJobPostingVariables`:
const createJobPostingVars: CreateJobPostingVariables = {
  title: ..., 
  description: ..., 
  hourlyRate: ..., 
  startTime: ..., 
  endTime: ..., 
  status: ..., 
};

// Call the `createJobPostingRef()` function to get a reference to the mutation.
const ref = createJobPostingRef(createJobPostingVars);
// Variables can be defined inline as well.
const ref = createJobPostingRef({ title: ..., description: ..., hourlyRate: ..., startTime: ..., endTime: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createJobPostingRef(dataConnect, createJobPostingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jobPosting_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jobPosting_insert);
});
```

## CreateApplication
You can execute the `CreateApplication` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createApplication(vars: CreateApplicationVariables): MutationPromise<CreateApplicationData, CreateApplicationVariables>;

interface CreateApplicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateApplicationVariables): MutationRef<CreateApplicationData, CreateApplicationVariables>;
}
export const createApplicationRef: CreateApplicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createApplication(dc: DataConnect, vars: CreateApplicationVariables): MutationPromise<CreateApplicationData, CreateApplicationVariables>;

interface CreateApplicationRef {
  ...
  (dc: DataConnect, vars: CreateApplicationVariables): MutationRef<CreateApplicationData, CreateApplicationVariables>;
}
export const createApplicationRef: CreateApplicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createApplicationRef:
```typescript
const name = createApplicationRef.operationName;
console.log(name);
```

### Variables
The `CreateApplication` mutation requires an argument of type `CreateApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateApplicationVariables {
  jobPostingId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateApplication` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateApplicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateApplicationData {
  application_insert: Application_Key;
}
```
### Using `CreateApplication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createApplication, CreateApplicationVariables } from '@dataconnect/generated';

// The `CreateApplication` mutation requires an argument of type `CreateApplicationVariables`:
const createApplicationVars: CreateApplicationVariables = {
  jobPostingId: ..., 
};

// Call the `createApplication()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createApplication(createApplicationVars);
// Variables can be defined inline as well.
const { data } = await createApplication({ jobPostingId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createApplication(dataConnect, createApplicationVars);

console.log(data.application_insert);

// Or, you can use the `Promise` API.
createApplication(createApplicationVars).then((response) => {
  const data = response.data;
  console.log(data.application_insert);
});
```

### Using `CreateApplication`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createApplicationRef, CreateApplicationVariables } from '@dataconnect/generated';

// The `CreateApplication` mutation requires an argument of type `CreateApplicationVariables`:
const createApplicationVars: CreateApplicationVariables = {
  jobPostingId: ..., 
};

// Call the `createApplicationRef()` function to get a reference to the mutation.
const ref = createApplicationRef(createApplicationVars);
// Variables can be defined inline as well.
const ref = createApplicationRef({ jobPostingId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createApplicationRef(dataConnect, createApplicationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.application_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.application_insert);
});
```

