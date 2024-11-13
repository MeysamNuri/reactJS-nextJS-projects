function loadComponent(importFunc) {
  return class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Component: null,
      };
    }

    componentDidMount() {
      importFunc().then((module) => {
        this.setState({
          Component: module.default,
        });
      });
    }

    render() {
      return this.state.Component ? (
        <this.state.Component {...this.props} />
      ) : null;
    }
  };
}
