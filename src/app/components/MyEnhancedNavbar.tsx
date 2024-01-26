import { Card, Flex, Stack, Text } from "@sanity/ui";

// Adds markup and invokes renderDefault()
function MyEnhancedNavbar(props: any) {
  return (
    <Stack>
      <Card padding={3} tone="caution">
        <Flex justify="space-between" align="center" paddingX={4}>
          <Text>WeliBlog</Text>
          <Text>Visit site</Text>
        </Flex>
      </Card>
      <>{props.renderDefault(props)}</>
    </Stack>
  );
}

export default MyEnhancedNavbar;
