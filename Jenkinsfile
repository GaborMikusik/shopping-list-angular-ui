pipeline {
    agent any
    tools {
        nodejs 'Node.js 18'
    }
    stages {
        stage('Install Dependencies') {
          steps {
            sh 'npm install -g @angular/cli'
            sh 'npm install'
          }
        }

        stage('Unit Tests') {
          steps {
            sh 'ng test --watch=false --browsers=ChromeHeadlessNoSandbox && echo "hello"'
                // Optionally, you can also generate JUnit test reports
                // junit '**/test-results.xml'
            }
        }

        stage('Build') {
          steps {
            sh 'npm run build'
          }
        }

        stage('Archive') {
          steps {
            archiveArtifacts artifacts: 'dist/**'
          }
        }
    }

    post {
        always {
      // Clean up workspace after build
      cleanWs()
        }

        success {
      // Do something on success (e.g., send notifications)
      echo 'Build and tests passed successfully!'
        }

        failure {
      // Do something on failure (e.g., send notifications)
      echo 'Build or tests failed!'
        }
    }
}