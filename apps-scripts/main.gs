//Função doGet é padrão do Google para inicialização da sua aplicação através do link implantado
function doGet(){
  //Cria template através do arquivo index.html
  var template = HtmlService.createTemplateFromFile('index')
  //Retorna a template, setando o titulo e permitando que ela será colocada em um iframe
  return template.evaluate()
    .setTitle("Lanchonete")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

//Função que permite incluir arquivos HTML ao seu index, usamos ela para separar o CSS e o Javascript do HTML
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

//Variavel global para acessar a planilha
var planilha = SpreadsheetApp.openById("1M7nI8nkf5zHj_ar7LhCm3hWQIo_FTEgnjTQmGIcU-X8")

//Função busca um produto pelo nome na base e retorna seus dados
function puxaProdutos(produto){
  var aba = planilha.getSheetByName("Cardápio")
  var dados = aba.getRange(1,1,aba.getLastRow(),4).getValues()

  var produtos = dados.map(function(r){return r[0];});
  var nomeProduto = dados.map(function(r){return r[1];});
  var custoProduto = dados.map(function(r){return r[2];});
  var valorVenda = dados.map(function(r){return r[3];});

  var res = []

  for(let i=0;i<produtos.length;i++){
    if(produtos[i] == produto){
      let product = {
        nome: nomeProduto[i],
        custo: custoProduto[i].toFixed(2),
        valor: valorVenda[i].toFixed(2),
        produto: produto
      }
      res.push(product)
    }
  }

  return res
}

//Função salva as informações do pedido na base
function salvar(pedido){
  var planilha = SpreadsheetApp.openById("1M7nI8nkf5zHj_ar7LhCm3hWQIo_FTEgnjTQmGIcU-X8")
  var aba = planilha.getSheetByName("Vendas")
  var pedidos = aba.getRange(1,1,aba.getLastRow(),1).getValues()
  
  var numeroPedido = 1
  if(pedidos.length > 1) numeroPedido = parseInt(pedidos[pedidos.length - 1]) + 1

  pedido.forEach((item)=>{
    aba.appendRow([numeroPedido,item.cliente,item.nome,item.quantidade,item.custo,item.valor])
  })
}