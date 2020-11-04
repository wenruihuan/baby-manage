export function printPartial (htmlTemp, cb) {
  const iframeDom = document.createElement('iframe')
  const attrObj = {
    height: 0,
    width: 0,
    border: 0,
    wmode: 'Opaque'
  }
  const styleObj = {
    position: 'absolute',
    top: '-999px',
    left: '-999px'
  }
  Object.entries(attrObj).forEach(([key, value]) => iframeDom.setAttribute(key, value))
  Object.entries(styleObj).forEach(([key, value]) => {
    iframeDom.style[key] = value
  })
  document.body.insertBefore(iframeDom, document.body.children[0])
  const iframeWin = iframeDom.contentWindow
  const iframeDocs = iframeWin.document
  iframeDocs.write(`<!doctype html>`)
  iframeDocs.write(htmlTemp)
  const imgDom = [...iframeDocs.getElementsByTagName('img')]
  const imgDomLeng = imgDom.length
  if (imgDomLeng > 0) {
    let loadIndex = 0
    imgDom.forEach((el, index) => {
      el.onload = function () {
        loadIndex++
        if (loadIndex === imgDomLeng) {
          iframeWin.focus()
          iframeWin.print()
          document.body.removeChild(iframeDom)
          cb && cb()
        }
      }
    })
  } else {
    iframeWin.focus()
    iframeWin.print()
    document.body.removeChild(iframeDom)
    cb && cb()
  }
}