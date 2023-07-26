import { writable, type Writable } from "svelte/store";
import type { ApiResult } from "./Crawler/ApiRequest";

export const ResultLog : Writable<Map<string, ApiResult>> = writable(new Map<string, ApiResult>());
export const StartSearch : Writable<boolean> = writable(false);