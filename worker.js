addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Prompt for name if not provided
  if (!url.searchParams.get('name')) {
    return new Response(
      `<html>
         <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;">
           <form method="GET">
             <label>Enter your name:</label>
             <input name="name" placeholder="Your Name"/>
             <button type="submit">Go</button>
           </form>
         </body>
       </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  // Serve static files from GitHub
  let path = url.pathname
  if (path === '/') path = '/index.html'

  const repoBase = 'https://raw.githubusercontent.com/destevez0610/hl-nmrk-subscription-handling/main'
  const fileURL = `${repoBase}${path}`

  try {
    const res = await fetch(fileURL)
    if (!res.ok) throw new Error('Not Found')

    const ext = path.split('.').pop()
    let contentType = 'text/html'
    if (ext === 'css') contentType = 'text/css'
    else if (ext === 'js') contentType = 'application/javascript'
    else if (ext === 'json') contentType = 'application/json'

    return new Response(await res.text(), { headers: { 'Content-Type': contentType } })
  } catch (err) {
    return new Response('Not Found', { status: 404 })
  }
}
