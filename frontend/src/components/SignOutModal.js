// SignOutModal.js
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAuth } from '../providers/AuthProvider';

const SignOutModal = ({ open, onClose}) => {
  const {signOut} = useAuth()


  const handleSignOut = () => {
    // Perform sign-out logic
    signOut();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign Out Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to sign out?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignOut} color="primary">
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignOutModal;