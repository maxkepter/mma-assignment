import { CreateJobPostingData, CreateJobPostingVariables, CreateApplicationData, CreateApplicationVariables, ListJobPostingsData, MyShiftsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateJobPosting(options?: useDataConnectMutationOptions<CreateJobPostingData, FirebaseError, CreateJobPostingVariables>): UseDataConnectMutationResult<CreateJobPostingData, CreateJobPostingVariables>;
export function useCreateJobPosting(dc: DataConnect, options?: useDataConnectMutationOptions<CreateJobPostingData, FirebaseError, CreateJobPostingVariables>): UseDataConnectMutationResult<CreateJobPostingData, CreateJobPostingVariables>;

export function useCreateApplication(options?: useDataConnectMutationOptions<CreateApplicationData, FirebaseError, CreateApplicationVariables>): UseDataConnectMutationResult<CreateApplicationData, CreateApplicationVariables>;
export function useCreateApplication(dc: DataConnect, options?: useDataConnectMutationOptions<CreateApplicationData, FirebaseError, CreateApplicationVariables>): UseDataConnectMutationResult<CreateApplicationData, CreateApplicationVariables>;

export function useListJobPostings(options?: useDataConnectQueryOptions<ListJobPostingsData>): UseDataConnectQueryResult<ListJobPostingsData, undefined>;
export function useListJobPostings(dc: DataConnect, options?: useDataConnectQueryOptions<ListJobPostingsData>): UseDataConnectQueryResult<ListJobPostingsData, undefined>;

export function useMyShifts(options?: useDataConnectQueryOptions<MyShiftsData>): UseDataConnectQueryResult<MyShiftsData, undefined>;
export function useMyShifts(dc: DataConnect, options?: useDataConnectQueryOptions<MyShiftsData>): UseDataConnectQueryResult<MyShiftsData, undefined>;
