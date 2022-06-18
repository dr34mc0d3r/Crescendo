import React from "react";

export default class FetchCrescendoData extends React.Component {
  state = {
    loading: true,
    person: null
  };

  async componentDidMount() {
    const url = "https://bitbucket.org/crescendocollective/frontend-api-skills-test/raw/c69c3c10cbebb6ec1d9100182a836d9459159671/data.json";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ CrescendoData: data.results, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.person) {
      return <div>didn't get CrescendoData</div>;
    }

    return (
      <div>
        <div>{this.state.CrescendoData.recipes[0].title}</div>
      </div>
    );
  }
}