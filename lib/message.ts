const MESSAGE_VARIABLES: { [key: string]: number } = {
  '{{name}}': 20,
  '{{link}}': 15,
};

export function characterCount(message: string) {
  let count = message.length;

  Object.keys(MESSAGE_VARIABLES).forEach(variable => {
    const regex = new RegExp(variable, 'g');
    const variableCount = (message.match(regex) || []).length;
    count += variableCount * (MESSAGE_VARIABLES[variable] - variable.length);
  });

  return count;
}
