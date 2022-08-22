import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import { deleteData, getDataClass } from '../../redux/class/actions';
import Loading from '../../components/Loading/Loading';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Menu from '../Menu/Menu';
import Paginatinon from '../../components/Pagination/Paginatinon';
import Filter from './Filter';
import ModalTableClass from './ModalTableClass';

const Class = () => {
  const { classData, isLoading, isError } = useSelector((state) => state.class);
  const [dataRender, setDataRender] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('asc');
  const [search, setSearch] = useState('');
  const [date, setDate] = useState();
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [positonEdit, setPosotionEdit] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataClass([page, sort, search, date, type]));
  }, [page, sort, search, date, type]);

  useEffect(() => {
    if (sort == '' || !sort) {
      setDataRender(classData);
    } else if (sort == 'asc') {
      const dataSortTemp = classData;
      const dataSort = dataSortTemp.sort((a, b) => a.className.localeCompare(b.className));
      setDataRender(dataSort);
    } else if (sort == 'desc') {
      const dataSortTemp = classData;
      const dataSort = dataSortTemp.sort((a, b) => b.className.localeCompare(a.className));
      setDataRender(dataSort);
    }
    if (search != '') {
      setDataRender((prev) => {
        return prev.filter((val) => val.className.toLowerCase().includes(search));
      });
    }
    if (date != '') {
      setDataRender((prev) => {
        return prev.filter((val) => moment(val.date).format('YYYY-MM-DD').includes(date));
      });
    }
    if (type != '' && type != 'Please select') {
      setDataRender((prev) => {
        return prev.filter((val) => val.oSName.includes(type));
      });
    }
  }, [classData, sort, search, date, type]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    params.page ? '' : (params.page = 1);
    params.sort ? '' : (params.sort = '');
    params.search ? '' : (params.search = '');
    params.date ? '' : (params.date = '');
    params.type ? '' : (params.type = '');
    setPage(params.page);
    setSort(params.sort);
    setSearch(params.search);
    setDate(params.date);
    setType(params.type);
    dispatch(getDataClass([params.page, params.sort, params.search, params.date, params.type]));
  }, [window.location.search]);

  const handleSort = useCallback(
    (s) => {
      if (s === 'asc') {
        setSort('desc');
        const dataSortTemp = classData;
        const dataSort = dataSortTemp.sort((a, b) => b.userName.localeCompare(a.userName));
        setDataRender(dataSort);
      } else {
        setSort('asc');
        const dataSortTemp = classData;
        const dataSort = dataSortTemp.sort((a, b) => a.userName.localeCompare(b.userName));
        setDataRender(dataSort);
      }
    },
    [classData]
  );

  const handleShowModalEdit = (index) => {
    setShow(true);
    setTypeModal('Edit');
    setPosotionEdit(index);
  };

  const handleShowModalDelete = (index) => {
    const _id = classData[index]._id;
    dispatch(deleteData([_id, index]));
  };

  const tableUsedTimeHeader = (
    <thead>
      <tr>
        <th>ID</th>
        <th>
          Class
          {sort == 'desc' ? (
            <FontAwesomeIcon
              icon={faArrowDown}
              data-testid="arrow-circle-down"
              onClick={() => handleSort(sort)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faArrowUp}
              data-testid="arrow-circle-up"
              onClick={() => handleSort(sort)}
            />
          )}
        </th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
  const tableUsedTimeBody = (
    <>
      <tbody>
        {isLoading && (
          <tr>
            <td colSpan={5}>
              <Loading />
            </td>
          </tr>
        )}
        {isError && (
          <tr>
            <td colSpan={5}>no data</td>
          </tr>
        )}
        {!isError &&
          !isLoading &&
          dataRender.map((val, index) => {
            return (
              <tr key={index + uuidv4()} style={{ height: '80px' }}>
                <td key={index + uuidv4()}>{val._id}</td>
                <td key={index + uuidv4()}>{val.className}</td>
                <td key={index + uuidv4()}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    data-testid={'edit-button' + index}
                    onClick={() => handleShowModalEdit(index)}
                  />
                </td>
                <td key={index + uuidv4()}>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleShowModalDelete(index)} />
                </td>
              </tr>
            );
          })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5}>
            <Paginatinon
              totalPages={4}
              page={page}
              setPage={setPage}
              sort={sort}
              search={search}
              date={date}
              type={type}
            />
          </td>
        </tr>
      </tfoot>
    </>
  );

  return (
    <div className="usedTime">
      <ModalTableClass
        show={show}
        setShow={setShow}
        typeModal={typeModal}
        positonEdit={positonEdit}
        classData={classData}
        setTypeModal={setTypeModal}
      />
      <Menu page={page} sort={sort} search={search} date={date} type={type} />
      <div className="padding-title">
        <Filter
          setDataRender={setDataRender}
          classData={classData}
          search={search}
          setSearch={setSearch}
          date={date}
          setDate={setDate}
          type={type}
          setType={setType}
          show={show}
          setShow={setShow}
          setTypeModal={setTypeModal}
          typeModal={typeModal}
        />
        <div className="usedTime-container">
          <Table striped bordered hover style={{ height: isLoading ? '500px' : '' }}>
            {tableUsedTimeHeader}
            {tableUsedTimeBody}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Class;
