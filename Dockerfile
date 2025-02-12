FROM mcr.microsoft.com/playwright:v1.61.0-jammy

# Set working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies inside the container
# Skip browser download since the official Playwright Docker image already contains them
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
RUN npm install

# Copy the rest of the application files
COPY . .

# Run the full test suite by default
CMD ["npm", "run", "test"]
