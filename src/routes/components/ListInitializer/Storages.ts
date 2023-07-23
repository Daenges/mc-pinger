import { writable, type Writable } from "svelte/store";

export const ActiveApiCallCounter : Writable<number> = writable(0)