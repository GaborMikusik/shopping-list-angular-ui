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
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'pwd'
                sh "docker build -t shopping-management-image:${env.BUILD_NUMBER} -f ${WORKSPACE}/Dockerfile ${WORKSPACE}"
            }
        }

        stage('Deploy to Docker Container') {
            steps {
                // Stop and remove the existing container (if running)
                sh 'docker stop shopping-management-container || true'
                sh 'docker rm shopping-management-container || true'
                // Run a new container with the updated image
                sh "docker run -d --name shopping-management-container -p 4200:80 shopping-management-image:${env.BUILD_NUMBER}"
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
            echo 'Build and tests passed successfully!'
        }

        failure {
            echo 'Build or tests failed!'
        }
    }
}
