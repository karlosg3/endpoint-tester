

export type HttpMethod =
    | 'GET'
    | 'POST'
//    | 'PUT'
//    | 'DELETE'
//    | 'PATCH'
;

export type Tab = {
    id: string
    label: string
    method: HttpMethod
    url: string
    headers: { key: string; value: string }[]
    body: string
}

export type HistoryEntry = {
    id: string
    tabId: string
    timestamp: string
    method: HttpMethod
    url: string
    headers: { key: string; value: string }[]
    body: string
    responseStatus: number
    responseTime: number
}

const TABS_KEY = 'daro_tabs'
const HISTORY_KEY = 'daro_history'
const MAX_HISTORY = 5 // Limited for testing, real value set to 100-200

export function generateId(): string {
    return crypto.randomUUID()
}
