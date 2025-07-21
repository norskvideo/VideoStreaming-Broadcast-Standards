#!/usr/bin/env python3
"""
Simple local web server for testing the Video Streaming Standards Diagram.
This script starts a local HTTP server to bypass browser CORS restrictions.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

def main():
    # Get the directory where this script is located
    script_dir = Path(__file__).parent.absolute()
    
    # Change to the project directory
    os.chdir(script_dir)
    
    # Check if the HTML file exists
    html_file = script_dir / "interactive-streaming-standards-diagram.html"
    if not html_file.exists():
        print("❌ Error: interactive-streaming-standards-diagram.html not found!")
        print(f"   Expected location: {html_file}")
        sys.exit(1)
    
    PORT = 8000
    
    # Create the server
    Handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("🚀 Starting local web server...")
            print(f"📁 Serving files from: {script_dir}")
            print(f"🌐 Server running at: http://localhost:{PORT}")
            print(f"📄 Open this URL: http://localhost:{PORT}/interactive-streaming-standards-diagram.html")
            print("\n💡 Press Ctrl+C to stop the server")
            print("-" * 60)
            
            # Try to open the browser automatically
            try:
                webbrowser.open(f"http://localhost:{PORT}/interactive-streaming-standards-diagram.html")
                print("✅ Browser opened automatically!")
            except:
                print("⚠️  Please open the URL manually in your browser")
            
            # Start the server
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {PORT} is already in use!")
            print(f"   Try a different port: python start-local-server.py --port 8001")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 