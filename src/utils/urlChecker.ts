const regex = new RegExp(/\bhttps?:\/\/[^\s/$.?#].[^\s]*\b/)

const checkMessageIfContainsUrl = (message: string): boolean => {
  return regex.test(message)
}

export default checkMessageIfContainsUrl