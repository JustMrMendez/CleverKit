import type Admin from 'pocketbase'
import type Record from 'pocketbase'
import { writable } from 'svelte/store'

export const currentUser = writable<Record | Admin | null>()