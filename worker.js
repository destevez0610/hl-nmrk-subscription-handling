addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Prompt for name
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
  const path = url.pathname === '/' ? '/index.html' : url.pathname
  const staticURL = `https://raw.githubusercontent.com/destevez0610/hl-nmrk-subscription-handling/main${path}`

  try {
    const res = await fetch(staticURL)
    if (!res.ok) throw new Error('Not Found')

    const ext = path.split('.').pop()
    const contentType =
      ext === 'css' ? 'text/css' :
      ext === 'js' ? 'application/javascript' :
      'text/html'

    return new Response(await res.text(), { headers: { 'Content-Type': contentType } })
  } catch (err) {
    return new Response('Not Found', { status: 404 })
  }
}
