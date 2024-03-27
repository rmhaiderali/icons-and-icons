export function tryCatch(tryer) {
  try {
    return [tryer(), null];
  } catch (error) {
    return [null, error];
  }
}

export async function asyncTryCatch(tryer) {
  try {
    return [await tryer(), null];
  } catch (error) {
    return [null, error];
  }
}
