import React from 'react';
import {
    Container,
    Box,
    TextField,
    Stack,
    Button,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
} from '@mui/material';
import { styled } from '@mui/system';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import StudentTable from '../StudentTable';
import { LIST_STUDENT } from '../../shared/students';
import { Student } from '../../model/Student';
import ConfirmDialog from '../ConfirmDialog';
import Switch from '../Switch';

const Wrapper = styled(Box)({
    padding: 30,
});

function StudentForm() {
    const [listStudent, setListStudent] =
        React.useState<Student[]>(LIST_STUDENT);

    const [studentSelected, setStudentSelected] = React.useState<
        Student | undefined
    >(undefined);

    //Dialog
    const [confirmDialog, setConfirmDialog] = React.useState<boolean>(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<Student>({
        defaultValues: {
            id: undefined,
            name: '',
            age: undefined,
            gender: 'female',
        },
    });

    const onSubmit: SubmitHandler<Student> = (student) => {
        if (!listStudent.find((item) => item.id === student.id)) {
            setListStudent((prev) => [student, ...prev]);
        } else {
            alert('Id already exists');
        }
    };

    const onSelect = (student: Student) => {
        reset(student);
        setStudentSelected(student);
    };

    const onEdit: SubmitHandler<Student> = (student: Student) => {
        const index = listStudent.findIndex(
            (item) => item.id === studentSelected?.id,
        );
        let newList = [...listStudent];
        newList[index] = student;
        setListStudent(newList);
    };

    const handleDeleteStudent = () => {
        setListStudent((prev) =>
            prev.filter((item) => item.id !== studentSelected?.id),
        );
        setConfirmDialog(false);
    };

    // const handleSort = () => {
    //     const sortedList = listStudent.sort(
    //         (a: Student, b: Student) => a.age - b.age,
    //     );
    //     setListStudent(sortedList);
    // };

    return (
        <>
            <>
                <ConfirmDialog
                    isOpen={confirmDialog}
                    onClose={() => setConfirmDialog(false)}
                    onSubmit={() => handleDeleteStudent()}
                />
            </>
            <Container>
                <Wrapper>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>ID</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    disabled={studentSelected ? true : false}
                                    variant="outlined"
                                    type="number"
                                    error={Boolean(errors?.id)}
                                    helperText={
                                        errors?.id?.type === 'required'
                                            ? 'Please enter student ID'
                                            : errors.id?.type === 'min'
                                            ? 'Student ID must be greater than or equal to 0'
                                            : ''
                                    }
                                    {...register('id', {
                                        required: true,
                                        min: 0,
                                    })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    error={Boolean(errors?.name)}
                                    helperText={
                                        errors.name &&
                                        'Please enter student name'
                                    }
                                    {...register('name', { required: true })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Age</FormLabel>
                                <TextField
                                    type="number"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    error={Boolean(errors?.age)}
                                    helperText={
                                        errors?.age?.type === 'required'
                                            ? 'Please enter age of student'
                                            : errors?.age?.type === 'min'
                                            ? 'Age must be greater than or equal to 0'
                                            : ''
                                    }
                                    {...register('age', {
                                        required: true,
                                        min: 0,
                                    })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Gender</FormLabel>
                                <Controller
                                    rules={{ required: true }}
                                    control={control}
                                    name="gender"
                                    render={({ field }) => (
                                        <RadioGroup {...field}>
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Male"
                                            />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                            <Box
                                sx={{
                                    padding: 2,
                                    backgroundColor: '#EEEEEE',
                                }}
                            >
                                <Stack spacing={2} direction="row">
                                    <Button type="submit" variant="contained">
                                        Add
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit(onEdit)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        disabled={
                                            studentSelected ? false : true
                                        }
                                        onClick={() => setConfirmDialog(true)}
                                    >
                                        Delete
                                    </Button>

                                    <Switch />

                                    {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleSort()}
                                    >
                                        Sort
                                    </Button> */}
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Wrapper>
                <StudentTable
                    listStudent={listStudent}
                    onSelect={onSelect}
                    idStudentSelected={studentSelected?.id}
                />
            </Container>
        </>
    );
}
export default StudentForm;
