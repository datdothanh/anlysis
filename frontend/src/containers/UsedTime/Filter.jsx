import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const Filter = ({ search, date, setSearch, setDate, setShow, setTypeModal }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const keyFilter = e.target.value.trim().toLowerCase();
    setSearch(keyFilter);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };
  const handleShowModal = () => {
    setShow(true);
    setTypeModal('Add');
  };

  return (
    <div className="filter">
      <Row>
        <Col>
          <input
            data-testid="input-name-used"
            className="filter-input"
            onChange={handleSearch}
            placeholder="Search"
            value={search}
          />
        </Col>
        <Col>
          <div className="d-flex input-date">
            <input
              data-testid="input-date-used"
              type="date"
              name="trip-start"
              value={date}
              onChange={handleChange}
            />
          </div>
        </Col>

        <Col>
          <Button
            variant="success"
            data-testid="add-button"
            aria-label="button-name"
            className=""
            onClick={handleShowModal}>
            Add
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
