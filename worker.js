addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Check for "name" query param before showing site
  if (!url.searchParams.get('name')) {
    return new Response(
      `<html>
         <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;">
           <form>
             <label>Enter your name:</label>
             <input name="name" placeholder="Your Name"/>
             <button type="submit">Go</button>
           </form>
         </body>
       </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  // Serve static files
  let path = url.pathname
  if (path === '/') path = '/index.html'

  try {
    return await fetch(new URL(`.${path}`, import.meta.url))
  } catch (err) {
    return new Response('Not Found', { status: 404 })
  }
}
