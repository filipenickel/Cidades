import React from "react";
import { connect } from "react-redux";
import { Button, Table } from "semantic-ui-react";
import PropTypes from "prop-types";
import actions from "./actions";

const List = ({ cities, getRanking, city, state }) => {
  const regexCity = new RegExp(city, "gi");
  const regexState = new RegExp(state, "gi");

  let filterCities;

  if (city === "" && state === "") {
    filterCities = [];
  } else {
    filterCities = Object.keys(cities)
      .filter(key => {
        if (city === "" && state !== "") {
          return regexState.test(cities[key].Estado);
        } else if (city !== "" && state === "") {
          return regexCity.test(cities[key].Nome);
        } else {
          return (
            regexCity.test(cities[key].Nome) &&
            regexState.test(cities[key].Estado)
          );
        }
      })
      .map(key => cities[key]);
  }

  const handleGetRanking = item => {
    getRanking(item);
  };

  return (
    <div>
      <Table size="small" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Cidade</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Pontos</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filterCities.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.Nome}</Table.Cell>
              <Table.Cell>{item.Estado}</Table.Cell>
              <Table.Cell>
                {item.ranking && item.ranking}
                {item.ranking === undefined && (
                  <Button
                    size="mini"
                    loading={item.loading}
                    disabled={item.loading}
                    primary
                    onClick={() => handleGetRanking(item)}
                  >
                    Ver Pontuação
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

List.propTypes = {
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
};

const mapState = state => {
  return {
    cities: state.cities.data
  };
};

const mapDispatch = dispatch => {
  return {
    getRanking: item => dispatch(actions.cities.getRanking(item))
  };
};

export default connect(mapState, mapDispatch)(List);
