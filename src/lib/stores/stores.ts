import { writable } from "svelte/store";
import type Record from "pocketbase";

export const messages = writable<Record[]>([]);