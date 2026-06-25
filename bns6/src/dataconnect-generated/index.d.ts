import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Application_Key {
  id: UUIDString;
  __typename?: 'Application_Key';
}

export interface CreateApplicationData {
  application_insert: Application_Key;
}

export interface CreateApplicationVariables {
  jobPostingId: UUIDString;
}

export interface CreateJobPostingData {
  jobPosting_insert: JobPosting_Key;
}

export interface CreateJobPostingVariables {
  title: string;
  description: string;
  hourlyRate: number;
  startTime: TimestampString;
  endTime: TimestampString;
  status: string;
}

export interface JobPosting_Key {
  id: UUIDString;
  __typename?: 'JobPosting_Key';
}

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

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface Shift_Key {
  id: UUIDString;
  __typename?: 'Shift_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateJobPostingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJobPostingVariables): MutationRef<CreateJobPostingData, CreateJobPostingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateJobPostingVariables): MutationRef<CreateJobPostingData, CreateJobPostingVariables>;
  operationName: string;
}
export const createJobPostingRef: CreateJobPostingRef;

export function createJobPosting(vars: CreateJobPostingVariables): MutationPromise<CreateJobPostingData, CreateJobPostingVariables>;
export function createJobPosting(dc: DataConnect, vars: CreateJobPostingVariables): MutationPromise<CreateJobPostingData, CreateJobPostingVariables>;

interface CreateApplicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateApplicationVariables): MutationRef<CreateApplicationData, CreateApplicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateApplicationVariables): MutationRef<CreateApplicationData, CreateApplicationVariables>;
  operationName: string;
}
export const createApplicationRef: CreateApplicationRef;

export function createApplication(vars: CreateApplicationVariables): MutationPromise<CreateApplicationData, CreateApplicationVariables>;
export function createApplication(dc: DataConnect, vars: CreateApplicationVariables): MutationPromise<CreateApplicationData, CreateApplicationVariables>;

interface ListJobPostingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListJobPostingsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListJobPostingsData, undefined>;
  operationName: string;
}
export const listJobPostingsRef: ListJobPostingsRef;

export function listJobPostings(options?: ExecuteQueryOptions): QueryPromise<ListJobPostingsData, undefined>;
export function listJobPostings(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListJobPostingsData, undefined>;

interface MyShiftsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyShiftsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MyShiftsData, undefined>;
  operationName: string;
}
export const myShiftsRef: MyShiftsRef;

export function myShifts(options?: ExecuteQueryOptions): QueryPromise<MyShiftsData, undefined>;
export function myShifts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MyShiftsData, undefined>;

