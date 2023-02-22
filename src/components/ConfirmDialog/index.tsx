import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
};

export default function ConfirmDialog({
    isOpen = false,
    onClose,
    onSubmit,
}: Props) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Delete student</DialogTitle>
            <DialogContent>Do you want delete this student?</DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onSubmit}>
                    Confirm
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        onClose();
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
