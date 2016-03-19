# This file provided by Facebook is for non-commercial testing and evaluation
# purposes only. Facebook reserves all rights not expressly granted.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import json
import os
import time
from flask import Flask, Response, request, make_response, session

app = Flask(__name__, static_url_path='', static_folder='public')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

@app.route('/api/comments', methods=['GET', 'POST'])
def comments_handler():

    with open('comments.json', 'r') as file:
        comments = json.loads(file.read())

    if request.method == 'POST':
        newComment = request.form.to_dict()
        newComment['id'] = int(time.time() * 1000)
        comments.append(newComment)

        with open('comments.json', 'w') as file:
            file.write(json.dumps(comments, indent=4, separators=(',', ': ')))

    return Response(json.dumps(comments), mimetype='application/json', headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})


@app.route('/api/todo',methods=['GET','POST'])
def todo_handler():
    with open('todo.json','r') as file:
        try:
            todo = json.loads(file.read())
        except ValueError:
            todo = []
    if request.method == 'POST':
        newTodo = json.loads(request.get_data())['newdata']
        todo=newTodo
        with open('todo.json','w') as file:
            file.write(json.dumps(todo))
    return Response(json.dumps(todo), mimetype='application/json', headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})

@app.route('/hello/<username>')
def hello(username):
    session['username']=username;
    return "works"

@app.route('/test')
def test():
    return "testing"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return 'post'
    else:
        if 'username' in session:
            return session['username']
        else:
            return "nothing"
        
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT",3000)),debug=True) 
