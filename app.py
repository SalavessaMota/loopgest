from flask import g, Flask, flash, redirect, render_template, request, session, url_for
from flask_mail import Mail, Message
import sqlite3

# Inicialização do aplicativo Flask
app = Flask(__name__)

# Configuração do Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'nunosalavessamota@gmail.com'
app.config['MAIL_PASSWORD'] = 'Googlegoogle1'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# Conexão com o banco de dados
DATABASE = 'loopgest.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/')
def index():
    # Cria a tabela se ela ainda não existir
    db = get_db()
    cur = db.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, telefone TEXT, tipologia TEXT, morada TEXT)')
    db.commit()
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    if request.method == 'POST':
        # Coletar dados do formulário
        nome = request.form['name']
        email = request.form['email']
        telefone = request.form['phone']
        tipologia = request.form['message']
        morada = request.form['morada']  # Supondo que você tenha um campo "morada" no formulário

        # Inserir dados na base de dados
        db = get_db()
        cur = db.cursor()
        cur.execute("INSERT INTO contatos (nome, email, telefone, tipologia, morada) VALUES (?, ?, ?, ?, ?)", (nome, email, telefone, tipologia, morada))
        db.commit()

        # Enviar email
        msg = Message("Novo contato", sender='nunosalavessamota@gmail.com', recipients=['nunosalavessamota@gmail.com'])
        msg.body = f'''
        De: {nome}, <{email}>
        Telefone: {telefone}
        Tipologia: {tipologia}
        Morada: {morada}
        '''
        mail.send(msg)

        flash('Mensagem enviada e dados armazenados com sucesso!')
        return redirect("/")

    return 'Algo deu errado'

if __name__ == '__main__':
    app.run(debug=True)
