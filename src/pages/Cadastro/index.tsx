import * as Form from '@radix-ui/react-form';

import { useContextSelector } from "use-context-selector"
import { Button, Flex, FormField, FormLabel, FormMessage, FormRoot, Input, Textarea } from './styles';

export function Cadastro () {
  return (
    <FormRoot>
    <FormField name="email">
      <Flex>
        <FormLabel>Email</FormLabel>
        <FormMessage match="valueMissing">Please enter your email</FormMessage>
        <FormMessage match="typeMismatch">Please provide a valid email</FormMessage>
      </Flex>
      <Form.Control asChild>
        <Input type="email" required />
      </Form.Control>
    </FormField>
    <FormField name="question">
      <Flex>
        <FormLabel>Question</FormLabel>
        <FormMessage match="valueMissing">Please enter a question</FormMessage>
      </Flex>
      <Form.Control asChild>
        <Textarea required />
      </Form.Control>
    </FormField>
    <Form.Submit asChild>
      <Button>Post question</Button>
    </Form.Submit>
  </FormRoot>

  )
}