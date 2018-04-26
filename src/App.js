import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Dimmer,
  Loader,
  Form,
  Button,
  Divider
} from "semantic-ui-react";
import actions from "./actions";
import List from "./List";

class App extends Component {
  state = {
    cityInput: "",
    stateInput: "",
    qCity: "",
    qState: ""
  };

  componentDidMount() {
    this.props.getCities();
  }

  handleChangeCity = e => {
    this.setState({ cityInput: e.target.value });
  };

  handleChangeState = e => {
    this.setState({ stateInput: e.target.value });
  };

  handleSubmit = e => {
    this.setState(prevState => {
      return {
        ...prevState,
        qCity: prevState.cityInput.trim(),
        qState: prevState.stateInput.trim()
      };
    });
  };

  render() {
    const { loading, error } = this.props;

    return (
      <Container>
        {loading &&
          !error && (
            <Dimmer active inverted>
              <Loader>Loading data...</Loader>
            </Dimmer>
          )}

        {error && (
          <div>
            <h1>Error</h1>
            {error}
          </div>
        )}

        {!loading &&
          !error && (
            <div>
              <div style={{ maxWidth: "300px" }}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Cidade:</label>
                    <input
                      placeholder="Cidade"
                      onChange={this.handleChangeCity}
                      value={this.state.cityInput}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Estado:</label>
                    <input
                      placeholder="Estado"
                      onChange={this.handleChangeState}
                      value={this.state.stateInput}
                    />
                  </Form.Field>
                  <Button type="submit">Procurar</Button>
                </Form>
              </div>

              <Divider />

              <div>
                <h1>Lista</h1>
                {this.state.qCity !== "" && (
                  <p>Por cidade: {this.state.qCity}</p>
                )}
                {this.state.qState !== "" && (
                  <p>Por estado: {this.state.qState}</p>
                )}
                <List city={this.state.qCity} state={this.state.qState} />
              </div>
            </div>
          )}
      </Container>
    );
  }
}

const mapState = state => {
  return {
    loading: state.cities.loading,
    error: state.cities.error
  };
};

const mapDispatch = dispatch => {
  return {
    getCities: () => dispatch(actions.cities.getCities())
  };
};

export default connect(mapState, mapDispatch)(App);
