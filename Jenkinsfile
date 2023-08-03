pipeline {
    agent any
    tools {
        nodejs 'Node.js 18'
    }
    stages {
        stage('Install Dependencies') {
      steps {
        // Install Node.js and Angular dependencies
        h 'npm install -g @angular/cli'
        sh 'npm install'
      }
        }

        // stage('Lint') {
        //     steps {
        //         // Run linting checks
        //         sh 'npm run lint'
        //     }
        // }

        stage('Unit Tests') {
            steps {
                // Run unit tests using Angular CLI
                sh 'ng test --watch=false'
            }
        }

        // stage('Unit Test') {
        //   steps {
        //     withEnv(['CHROME_BIN=/usr/bin/chromium']) {
        //       sh 'npm run test -- --browsers ChromeHeadless'
        //     }
        //     junit '**/test-results.xml'
        //   }
        // }

        stage('Build') {
      steps {
        // Build the Angular app
        sh 'npm run build'
      }
        }

        stage('Archive') {
      steps {
        // Archive the build artifacts (e.g., for deployment)
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

// pipeline {
//   agent any
//   stages {
//     stage("build") {
//         steps {
//           echo 'building the application...'
//         }
//     }

//     stage("test") {
//         steps {
//           echo 'testing the application...'
//         }
//     }

//     stage("deploy") {
//         steps {
//           echo 'deploying the application...'
//         }
//     }
//   }
// }
