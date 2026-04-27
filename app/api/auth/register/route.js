// Simple in-memory user storage
const users = [];

export async function POST(request) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return new Response(JSON.stringify({ error: 'All fields required' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ error: 'Passwords do not match' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    if (password.length < 8) {
      return new Response(JSON.stringify({ error: 'Password must be at least 8 characters' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Create user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'user'
    };
    users.push(newUser);

    console.log('User registered:', email);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Registration successful!' 
    }), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Registration failed' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
