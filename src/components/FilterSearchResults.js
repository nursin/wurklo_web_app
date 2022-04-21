import React, { useState } from 'react';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import FilterListIcon from '@mui/icons-material/FilterList';


function FilterSearchResults({ setNameFilter, setRateFilter }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempNameFilter, setTempNameFilter] = useState('');
    const [tempRateFilter, setTempRateFilter] = useState('');


    const handleApplyFilter = () => {
        setNameFilter(tempNameFilter)
        setRateFilter(tempRateFilter === 'Lowest Rate' ? 'asc' : 'desc')
        setIsModalOpen(false)
    }
    return (
        <>
            <FilterListIcon
                className='filterSearchResults__searchFilterIcon'
                onClick={() => setIsModalOpen(isModalOpen ? false : true)}
            />

            <Modal
                className='createWurker__modal'
                scrollable
                size="lg"
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(isModalOpen ? false : true)}
            >
                <ModalHeader toggle={() => setIsModalOpen(false)}>
                    <p className='text-secondary m-0'><strong>Filter/Sort Results</strong></p>
                </ModalHeader>
                <ModalBody className=' pt-0'>
                    <Col className="createWurker text-center mt-0 mx-auto">
                        <FormGroup>
                            <Input
                                className='search__input mt-4'
                                id="nameSelect"
                                name="name"
                                type="select"
                                value={tempNameFilter}
                                onChange={e => setTempNameFilter(e.target.value)}
                            >
                                <option disabled>
                                    Name
                                </option>
                                <option>
                                    A - Z
                                </option>
                                <option>
                                    Z - A
                                </option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                className='search__input shadow-none mt-4'
                                id="rateSelect"
                                name="rate"
                                type="select"
                                value={tempRateFilter}
                                onChange={e => setTempRateFilter(e.target.value)}
                            >
                                <option disabled>
                                    Rate
                                </option>
                                <option>
                                    Lowest Rate
                                </option>
                                <option>
                                    Highest Rate
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                </ModalBody>
                <ModalFooter className='d-inline py-1 text-center'>
                    <Button
                        outline
                        color='primary'
                        onClick={handleApplyFilter}
                        className='make-round p-2 px-4 mt-0'
                    >
                        Apply Filter
                    </Button>
                    <Button outline className='make-round p-2 mt-0' onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FilterSearchResults