def tmlabel = "UI-component-Build${BUILD_NUMBER}-${UUID.randomUUID().toString()}"
def yaml = """
apiVersion: v1
kind: Pod
metadata:
  labels:
    docker-compose: true
spec:
  containers:
    - name: docker
      image: tm-registry.transitionmanager.net/tds-ci/tm-docker-compose:latest
      command:
      - cat
      tty: true
      volumeMounts:
      - mountPath: /var/run/docker.sock
        name: docker-socket-volume
      securityContext:
        allowPrivilegeEscalation: true
        privileged: true
  volumes:
    - name: docker-socket-volume
      hostPath:
        path: /var/run/docker.sock
        type: File
"""

podTemplate (
    label: tmlabel,
    imagePullSecrets: ['tm-registry'],
    yaml: yaml
) {
    node(tmlabel) {
        def registry = "tm-registry.transitionmanager.net/tds-ci"
        def registryCredential = "d1920d69-59ad-45d6-b345-69c746c05794"
        def name = "ui-components"
        def uiImage

        stage('Checkout') {
            container('node') {
                checkout scm
            }
        }

        // stage('Build for Test') {
        //     container('node') {
        //         sh "npm i"
        //     }
        // }
        //
        // stage('Test') {
        //     container('node') {
        //         sh "npm run test"
        //     }
        // }
        //
        // stage('Lint') {
        //     container('node') {
        //         sh "npm run lint"
        //     }
        // }

        // if (env.BRANCH_NAME == 'develop') {
            stage('Build image') {
                container('docker') {
                    uiImage = docker.build("${registry}/${name}:${env.BUILD_ID}", ".")
                }
            }

            stage('Publish') {
                container('docker') {
                    // withCredentials([usernamePassword(credentialsId: registryCredential,
                    //                                   passwordVariable: 'NEXUS_PASSWORD',
                    //                                   usernameVariable: 'NEXUS_USER')]) {
                    //     sh "docker login -u $NEXUS_USER -p \"$NEXUS_PASSWORD\" ${registry}"
                    // }

                    docker.withRegistry(registry, registryCredential)

                    uiImage.push()
                    uiImage.push("latest")
                }
            }
        // }
    }
}
