pipeline {
    environment {
      registry = 'https://registry.thecodeworkers.com'
      tag = 'registry.thecodeworkers.com/banana-api'
      registryCredential = 'DockerRegistry'
      dockerImage = ''
      API_TOKEN = credentials('kubernetesSecret')
    }
    agent any

    stages {
      stage('Sonar Scanner') {
        steps {
          withSonarQubeEnv('Sonarqube TCW') {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=banana-api"
          }
          timeout(time: 1, unit: 'HOURS') {
            waitForQualityGate abortPipeline: true
          }
        }
      }
      stage('Build Test') {
        steps {
          yarn 'install'
          yarn 'build'
          sh 'rm -R node_modules'
        }
      }
      stage('Docker Build') {
        when {
          anyOf {
            expression {env.GIT_BRANCH == 'origin/test'}
            expression {env.GIT_BRANCH == 'origin/dev'}
          }
        }
        steps {
          sh "echo URL=https://banana-$DEPLOY_TO-api.thecodeworkers.com >> .env"
          script {
            docker.withRegistry(registry, registryCredential ) {
              docker.build("banana-api:$BUILD_NUMBER", '-f Dockerfile.test ./').push()
              docker.build("banana-api:latest-$DEPLOY_TO", '-f Dockerfile.test ./').push()
            }
          }
          sh "docker rmi $tag:$BUILD_NUMBER"
          sh "docker rmi $tag:latest-$DEPLOY_TO"
        }
      }
      stage('Kubernetes Deploy') {
        when {
          anyOf {
            expression {env.GIT_BRANCH == 'origin/test'}
            expression {env.GIT_BRANCH == 'origin/dev'}
          }
        }
        steps {
         sh "kubectl --token $API_TOKEN --server https://10.96.0.1 --insecure-skip-tls-verify=true delete -f ./scripts/$DEPLOY_TO | true"
         sh "kubectl --token $API_TOKEN --server https://10.96.0.1 --insecure-skip-tls-verify=true apply -f ./scripts/$DEPLOY_TO"
        }
      }
    }
}
