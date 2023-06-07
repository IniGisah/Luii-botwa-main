#!/bin/bash

# Function to display usage instructions
usage() {
  echo "Usage: $0 <file> <search_string> <string_to_append>"
  echo "Example: $0 file.txt 'Hello' ' World'"
  exit 1
}

# Check for correct number of arguments
if [ "$#" -ne 3 ]; then
  usage
fi

#!/bin/bash

# Define the file to be edited
FILE="$1"

# Define the known string to search for
KNOWN_STRING="$2"

# Define the string to append to each line containing the known string
APPEND_STRING="$3"

# Create a temporary file to store the updated lines
TMP_FILE=$(mktemp)

# Loop through each line in the file
while IFS= read -r line; do
  # Check if the known string exists in the current line
  if [[ "$line" == *"$KNOWN_STRING"* ]]; then
    # Check if a semicolon is detected at the end of the line
    if [[ "${line: -1}" == ";" ]]; then
      # Calculate the index of the 3rd character from the end of the line
      third_char_from_end=$(( ${#line} - 2 ))
      # Append the string to the 3rd character from the end of the current line
      updated_line="${line:0:$third_char_from_end}$APPEND_STRING${line:$third_char_from_end}"
    else
      # Calculate the index of the 2nd character from the end of the line
      second_char_from_end=$(( ${#line} - 1 ))
      # Append the string to the 2nd character from the end of the current line
      updated_line="${line:0:$second_char_from_end}$APPEND_STRING${line:$second_char_from_end}"
    fi
    echo "Updating line: $line"
    echo "Updated line: $updated_line"
    # Append the updated line to the temporary file
    echo "$updated_line" >> "$TMP_FILE"
  else
    # If the line doesn't contain the known string, write the original line to the temporary file
    echo "$line" >> "$TMP_FILE"
  fi
done < "$FILE"

# Replace the original file with the updated lines
mv "$TMP_FILE" "$FILE"

# Remove the temporary file
rm "$TMP_FILE"
