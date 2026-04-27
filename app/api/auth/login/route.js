// Simple in-memory user storage (shared with register)
const users = [];

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Find user
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    console.log('Login successful:', email);

    const response = new Response(JSON.stringify({
      success: true,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });

    // Set cookie
    response.headers.set('Set-Cookie', `token=${user.id}; Path=/; HttpOnly; Max-Age=604800; SameSite=Lax`);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
