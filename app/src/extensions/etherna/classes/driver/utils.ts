export const safeTrailingSlash = (component: string | null | undefined) => {
  return component?.replace(/\/?$/, "") ?? ""
}