import { writable, type Writable } from "svelte/store";
import type { ApiResult } from "./Crawler/ApiRequest";

export const ActiveApiCallCounter : Writable<number> = writable(0);
export const ResultLog : Writable<{[key: string] : ApiResult}> = writable({});