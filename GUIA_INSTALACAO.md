# 💰 Expense Tracker - Guia de Instalação e Uso

## Sobre o Aplicativo

O **Expense Tracker** é um aplicativo web completo para controle de gastos pessoais, desenvolvido com Python Flask no backend e HTML/CSS/JavaScript no frontend. O aplicativo permite registrar receitas e despesas, categorizar transações e visualizar relatórios financeiros através de um dashboard interativo.

### Funcionalidades Principais

- **Dashboard Interativo**: Visualização em tempo real de receitas, despesas e saldo
- **Cadastro de Transações**: Adicionar receitas e despesas com categorização
- **Gráficos Dinâmicos**: Visualização de gastos por categoria usando Chart.js
- **Histórico Completo**: Lista de todas as transações com opção de exclusão
- **Interface Responsiva**: Design moderno que funciona em desktop e mobile
- **Banco de Dados SQLite**: Armazenamento local dos dados

## Pré-requisitos

Antes de instalar o aplicativo, certifique-se de ter os seguintes itens instalados em seu sistema:

- **Python 3.8 ou superior**
- **pip** (gerenciador de pacotes do Python)
- **Git** (opcional, para clonar o repositório)

### Verificando os Pré-requisitos

Para verificar se o Python está instalado:
```bash
python --version
# ou
python3 --version
```

Para verificar se o pip está instalado:
```bash
pip --version
# ou
pip3 --version
```

## Instalação

### Passo 1: Obter o Código

Se você recebeu o código em um arquivo compactado, extraia-o para uma pasta de sua escolha. Se o código estiver em um repositório Git, clone-o:

```bash
git clone <url-do-repositorio>
cd expense-tracker
```

### Passo 2: Criar Ambiente Virtual

É altamente recomendado usar um ambiente virtual para isolar as dependências do projeto:

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual (Windows)
venv\Scripts\activate

# Ativar ambiente virtual (Linux/Mac)
source venv/bin/activate
```

### Passo 3: Instalar Dependências

Com o ambiente virtual ativado, instale as dependências do projeto:

```bash
pip install -r requirements.txt
```

As principais dependências incluem:
- Flask (framework web)
- Flask-SQLAlchemy (ORM para banco de dados)
- Flask-CORS (suporte a CORS)

### Passo 4: Verificar Estrutura do Projeto

Certifique-se de que a estrutura do projeto está correta:

```
expense-tracker/
├── venv/                    # Ambiente virtual
├── src/
│   ├── models/
│   │   └── transaction.py   # Modelo de dados
│   ├── routes/
│   │   └── transaction.py   # Rotas da API
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css    # Estilos CSS
│   │   ├── js/
│   │   │   └── script.js    # JavaScript
│   │   └── index.html       # Página principal
│   ├── database/
│   │   └── app.db          # Banco SQLite (criado automaticamente)
│   └── main.py             # Arquivo principal
└── requirements.txt        # Dependências
```

## Executando o Aplicativo

### Passo 1: Ativar Ambiente Virtual

Sempre que for executar o aplicativo, certifique-se de que o ambiente virtual está ativado:

```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### Passo 2: Iniciar o Servidor

Execute o arquivo principal para iniciar o servidor Flask:

```bash
python src/main.py
```

Você verá uma saída similar a esta:

```
 * Serving Flask app 'main'
 * Debug mode: on
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://[seu-ip]:5000
```

### Passo 3: Acessar o Aplicativo

Abra seu navegador web e acesse:

```
http://localhost:5000
```

O aplicativo será carregado e você verá o dashboard principal.

## Como Usar o Aplicativo

### Dashboard Principal

Ao acessar o aplicativo, você verá o dashboard com três cartões principais:

1. **Receitas**: Total de todas as receitas registradas
2. **Despesas**: Total de todas as despesas registradas  
3. **Saldo**: Diferença entre receitas e despesas

Abaixo dos cartões, há duas seções:
- **Gastos por Categoria**: Gráfico de pizza mostrando a distribuição das despesas
- **Transações Recentes**: Lista das 5 transações mais recentes

### Adicionando Nova Transação

1. Clique em **"Nova Transação"** na barra de navegação
2. Preencha os campos obrigatórios:
   - **Tipo**: Selecione "Receita" ou "Despesa"
   - **Valor**: Digite o valor da transação
   - **Categoria**: Escolha uma categoria predefinida ou digite uma nova
   - **Data**: A data atual é preenchida automaticamente, mas pode ser alterada
3. Opcionalmente, adicione uma **Descrição**
4. Clique em **"Salvar Transação"**

### Categorias Predefinidas

O aplicativo inclui categorias predefinidas para facilitar o uso:

**Para Receitas:**
- Salário
- Freelance
- Investimentos
- Vendas
- Outros

**Para Despesas:**
- Alimentação
- Transporte
- Moradia
- Saúde
- Educação
- Lazer
- Compras
- Outros

### Visualizando Todas as Transações

1. Clique em **"Transações"** na barra de navegação
2. Você verá uma tabela com todas as transações registradas
3. Para deletar uma transação, clique no ícone de lixeira na coluna "Ações"
4. Use o botão **"Atualizar"** para recarregar a lista

### Interpretando o Gráfico de Categorias

O gráfico de pizza no dashboard mostra apenas as **despesas** organizadas por categoria. Isso ajuda a identificar onde você está gastando mais dinheiro. O gráfico é atualizado automaticamente sempre que você adiciona ou remove transações.

## Solução de Problemas

### Erro: "Módulo não encontrado"

Se você receber erros sobre módulos não encontrados, certifique-se de que:
1. O ambiente virtual está ativado
2. As dependências foram instaladas corretamente: `pip install -r requirements.txt`

### Erro: "Porta já em uso"

Se a porta 5000 já estiver em uso, você pode:
1. Parar outros processos que usam a porta 5000
2. Ou modificar o arquivo `src/main.py` para usar uma porta diferente:

```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)  # Mudança para porta 5001
```

### Banco de Dados Corrompido

Se houver problemas com o banco de dados:
1. Pare o servidor (Ctrl+C)
2. Delete o arquivo `src/database/app.db`
3. Reinicie o servidor - um novo banco será criado automaticamente

### Problemas de Interface

Se a interface não carregar corretamente:
1. Verifique se todos os arquivos estão na estrutura correta
2. Limpe o cache do navegador (Ctrl+F5)
3. Verifique o console do navegador (F12) para erros JavaScript

## Personalizações

### Adicionando Novas Categorias

Para adicionar categorias permanentes, edite o arquivo `src/static/js/script.js` e modifique o objeto `PREDEFINED_CATEGORIES`:

```javascript
const PREDEFINED_CATEGORIES = {
    income: ['Salário', 'Freelance', 'Investimentos', 'Vendas', 'Nova Categoria', 'Outros'],
    expense: ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Compras', 'Nova Categoria', 'Outros']
};
```

### Modificando Cores

Para alterar as cores do aplicativo, edite o arquivo `src/static/css/style.css`. As principais cores estão definidas nas classes:
- `.bg-success` (verde para receitas)
- `.bg-danger` (vermelho para despesas)
- `.bg-info` (azul para saldo)

### Alterando a Moeda

Para alterar a moeda de Real (BRL) para outra, modifique a função `formatCurrency` no arquivo `src/static/js/script.js`:

```javascript
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {  // Altere para sua localização
        style: 'currency',
        currency: 'USD'  // Altere para sua moeda
    }).format(amount);
}
```

## Backup e Restauração

### Fazendo Backup

Para fazer backup dos seus dados:
1. Pare o servidor
2. Copie o arquivo `src/database/app.db` para um local seguro
3. Reinicie o servidor

### Restaurando Backup

Para restaurar um backup:
1. Pare o servidor
2. Substitua o arquivo `src/database/app.db` pelo arquivo de backup
3. Reinicie o servidor

## Segurança

### Considerações Importantes

- Este aplicativo é destinado para uso **local/pessoal**
- Não exponha o servidor Flask diretamente na internet sem configurações de segurança adequadas
- Para uso em produção, considere usar um servidor web como Nginx + Gunicorn
- Os dados são armazenados localmente no arquivo SQLite

### Configurações de Produção

Se você quiser disponibilizar o aplicativo na internet, considere:
1. Usar HTTPS
2. Configurar autenticação de usuários
3. Usar um banco de dados mais robusto (PostgreSQL, MySQL)
4. Implementar validações de segurança adicionais

## Suporte e Desenvolvimento

### Estrutura do Código

- **Backend (Flask)**: Localizado em `src/main.py`, `src/models/` e `src/routes/`
- **Frontend**: Localizado em `src/static/`
- **Banco de Dados**: SQLite em `src/database/app.db`

### Adicionando Novas Funcionalidades

Para adicionar novas funcionalidades:
1. Modifique o modelo de dados em `src/models/transaction.py` se necessário
2. Adicione novas rotas em `src/routes/transaction.py`
3. Atualize o frontend em `src/static/`

### Logs e Debugging

Para ativar logs mais detalhados, modifique o arquivo `src/main.py`:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Conclusão

O Expense Tracker é uma solução completa e fácil de usar para controle de gastos pessoais. Com sua interface intuitiva e funcionalidades abrangentes, você pode manter suas finanças organizadas e tomar decisões mais informadas sobre seus gastos.

Para dúvidas ou sugestões de melhorias, consulte a documentação do código ou entre em contato com o desenvolvedor.

---

**Desenvolvido por:** Manus AI  
**Versão:** 1.0  
**Data:** Junho 2025

