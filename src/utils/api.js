const busca_todas_cidades_url =
  "http://wsteste.devedp.com.br/Master/CidadeServico.svc/rest/BuscaTodasCidades";
const busca_pontos_url =
  "http://wsteste.devedp.com.br/Master/CidadeServico.svc/rest/BuscaPontos";

export default {
  city: {
    all() {
      const method = "GET";
      const headers = { Accept: "application/json" };
      return fetch(busca_todas_cidades_url, { headers, method })
        .then(res => res.json())
        .then(data => {
          // normalizr
          const cities = {};
          for (const [index, values] of data.entries()) {
            const id = `city_${index}`;
            cities[id] = {
              id: id,
              ...values
            };
          }
          return cities;
        });
    },

    getRanking(item) {
      const headers = {};
      const method = "POST";
      const body = JSON.stringify({ Nome: item.Nome, Estado: item.Estado });
      return fetch(busca_pontos_url, { headers, method, body })
        .then(res => res.json())
        .then(data => data);
    }
  }
};
