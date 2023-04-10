export function formatData<T>(form: HTMLFormElement) {
    const data = new FormData(form)
    const value = Object.fromEntries(data.entries())
    return value as unknown as T
}