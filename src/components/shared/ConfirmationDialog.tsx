import React from "react";
import { Modal, TouchableOpacity, StyleSheet } from "react-native";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  ButtonText,
  Icon,
  TrashIcon,
} from "@gluestack-ui/themed";

interface ConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmAction?: "primary" | "secondary" | "positive" | "negative";
  icon?: React.ComponentType<any>;
  iconColor?: string;
  iconBgColor?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmAction = "negative",
  icon: IconComponent = TrashIcon,
  iconColor = "$red500",
  iconBgColor = "$red100",
}) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <Box
            bg="$white"
            borderRadius="$xl"
            p="$6"
            mx="$4"
            alignItems="center"
            shadowColor="$black"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.25}
            shadowRadius={8}
            elevation={8}
          >
            <VStack space="lg" alignItems="center" w="$full">
              <Box
                borderRadius="$full"
                h="$16"
                w="$16"
                bg={iconBgColor}
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={IconComponent} size="xl" color={iconColor} />
              </Box>

              <VStack space="md" alignItems="center">
                <Heading size="lg" textAlign="center">
                  {title}
                </Heading>
                <Text size="md" textAlign="center" color="$gray600">
                  {message}
                </Text>
              </VStack>

              <HStack space="md" w="$full" justifyContent="center">
                <Button
                  size="md"
                  action={confirmAction}
                  onPress={onConfirm}
                  flex={1}
                >
                  <ButtonText>{confirmText}</ButtonText>
                </Button>
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={onClose}
                  size="md"
                  flex={1}
                >
                  <ButtonText>{cancelText}</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </Box>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
