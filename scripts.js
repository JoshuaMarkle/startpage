/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"pMcot1k3eX9Dtrup","label":"school","bookmarks":[{"id":"ueH68eDOZ3HFr90f","label":"warhill","url":"https://wjccschools.instructure.com/login/saml"},{"id":"RZFvGNEcDnh07Vos","label":"new horizons","url":"https://newhorizons.instructure.com/"},{"id":"XdkOyy92PNuKjxEE","label":"studentvue","url":"https://va-wjccp-psv.edupoint.com/PXP2_Login_Student.aspx"}]},{"id":"yWKNeUelc7EDyAhO","label":"reddit","bookmarks":[{"id":"JdnuPkbiBY69ksZv","label":"r/unixporn","url":"reddit.com/r/unixporn/"},{"id":"TsHTW0cX0ln9W5c0","label":"r/awesomewm","url":"reddit.com/r/awesomewm/"},{"id":"680ktZCWhlJrZwGF","label":"r/unity3d","url":"reddit.com/r/Unity3D/"}]},{"id":"TVRh2ZnlnVWN9BKH","label":"media","bookmarks":[{"id":"VscWLWzqn1pGF76s","label":"youtube","url":"youtube.com"},{"id":"ONesWZWBVJyR58lm","label":"pinterest","url":"pinterest.com"},{"id":"lvcKl26DwFudGixX","label":"amazon","url":"amazon.com"}]},{"id":"O1yHPp9qfTXI1uyg","label":"typing","bookmarks":[{"id":"tY53yiZv6rTgy06B","label":"monkeytype","url":"monkeytype.com"},{"id":"SYNtyeTkyotH8Zqt","label":"type racer","url":"play.typeracer.com"},{"id":"4QdUU0yXgxsyRx6g","label":"typing.io","url":"typing.io"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
