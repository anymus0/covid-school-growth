class Fetchy {
  static async Get (link) {
    try {
      // start fetching
      const response = await window.fetch(link)
      if (!response.ok) {
        throw response.status
      }
      const data = await response.json()
      return data
      // Catch Error
    } catch (err) {
      console.log('OOPS! Error requesting the requests that were requested with the requests :(')
      console.log(err)
      return err
    }
  }
}

export { Fetchy }
