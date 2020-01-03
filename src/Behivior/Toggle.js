import React from 'react'
const withDropdown = (WrappedComponent) => 
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = { showDropdown: false };
    }

    onToggle = () => this.setState({ 'showDropdown': !this.state.showDropdown });

    onSelect = (field, value) => {
      this.setState({ showDropdown: false }, () => {
        if (this.props.onSelect) {
          this.props.onSelect(field, value);
        }
      });
    }

    render() {
      return (
        <WrappedComponent
          onToggle={this.onToggle}
          showDropdown={this.state.showDropdown}
          clickHandler={this.onSelect}
          { ...this.props }
        />
      );
    }
  };

export default withDropdown;