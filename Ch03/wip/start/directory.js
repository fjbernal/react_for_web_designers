(function() {
  "use strict";

  function Person(props) {
    return (
      <div className="person">
        <h3>
          {props.person.name}, {props.person.title}
        </h3>

        <p>
          <img className="size-medium alignright" src={props.person.img} alt={props.person.name} width="300" height="300"  sizes="(max-width: 300px) 100vw, 300px" /> 
          
          {props.person.bio}
        </p>
      </div>
    );
  }

  function People(props) {
    return (
      <div className="results">
        <ReactTransitionGroup.TransitionGroup>
          {props.people.map(function(person) {
            return (
              <ReactTransitionGroup.CSSTransition key={person.id} classNames={{
                enter: "animated",
                enterActive: "zoomIn",
                exit: "animated",
                exitActive: "zoomOut"
              }} 
              timeout={1000}>
                <Person person={person} />
              </ReactTransitionGroup.CSSTransition>
            );
          })}
        </ReactTransitionGroup.TransitionGroup>
      </div>
    );
  }

  function Filters(props) {

    const titles = window.LMDirectory.titles;

    function updateName(event) {
      props.updateFormState({currentName: event.target.value});
    }

    function updateTitle(event) {
      props.updateFormState({currentTitle: event.target.value});
    }

    function updateIntern(event) {
      props.updateFormState({isIntern: event.target.checked});
    }

    function resetFilters() {
      props.updateFormState({
        "currentName": '',
        "currentTitle": '',
        isIntern: false
      });
    }

    return (
      <form action="" id="directory-filters">
          <div className="group">
            <label htmlFor="person-name">Name:</label>
            <input type="text" name="person_name" value="" placeholder="Name of employee" id="person-name" value={props.currentName} onChange={updateName} />
          </div>
          <div className="group">
            <label htmlFor="person-title">Job Title:</label>
            <select name="person_title" id="person-title" value={props.currentTitle} onChange={updateTitle}>
              <option value="">- Select -</option>
              {titles.map(function(title) {
                return (
                  <option value={title.key} key={title.key}>
                    {title.display}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="group">
            <label><input type="checkbox" value="1" name="person_intern" checked={props.isIntern} onChange={updateIntern} /> Intern</label>
          </div>
          <div className="group">
            <input type="reset" value="Reset" onClick={resetFilters} />
          </div>
      </form>
    );
  }

  class Directory extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        people: window.LMDirectory.people,
        currentName: "",
        currentTitle: "",
        isIntern: false
      };

      this.updateFormState = this.updateFormState.bind(this);
    }

    updateFormState(spec) {
      this.setState(spec, this.updatePeopleList);
    }

    // search the whole employee list with current filters
    updatePeopleList() {
      var filteredPeople = window.LMDirectory.people.filter(
        function(person) {
          return (
            person.intern === this.state.isIntern &&
            (this.state.currentName === "" ||
              person.name.toLowerCase().indexOf(this.state.currentName.toLowerCase()) !==
                -1) &&
            (this.state.currentTitle === "" || person.title_cat === this.state.currentTitle)
          );
        }.bind(this)
      );

      this.setState({
        people: filteredPeople
      });
    }

    render() {
      return (
        <div className="company-directory">
          <h2>
              Company Directory
          </h2>
          <p>Learn more about each person at Leaf & Mortar in this company directory.</p>
          
          <Filters currentName={this.state.currentName} currentTitle={this.state.currentTitle} isIntern={this.state.isIntern} updateFormState={this.updateFormState} />

          <People people={this.state.people} />
        </div>
      );
    }
  }

  ReactDOM.render(<Directory />, document.getElementById('directory-root'))
})();
